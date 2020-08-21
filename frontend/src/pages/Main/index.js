import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../../services/api';

import logo from '../../assets/routeasy.png';

import {
  Container,
  Content,
  LeftContent,
  RightContent,
  Table,
  Resume,
  Box,
} from './styles';

export default function Main() {
  const [myRegisters, setMyRegisters] = useState([]);
  const [activeClient, setActiveClient] = useState(null);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [location, setLocation] = useState('');
  const [place, setPlace] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [mapLat, setMapLat] = useState('');
  const [mapLng, setMapLng] = useState('');
  const [loading, setLoading] = useState(false);

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      setMapLat(position.coords.latitude);
      setMapLng(position.coords.longitude);
    });
  }

  async function geocode() {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          address: location,
          key: 'AIzaSyAJwTL_WQK7sIhlccPw7XhSLL_uoqlu_ic',
        },
      }
    );
    const data = response.data.results[0];
    const address = data.address_components;
    const geometry = data.geometry.location;

    switch (address.length) {
      case 6:
        setPlace(address[0].short_name);
        setNumber('Vazio');
        setComplement('Vazio');
        setNeighborhood(address[1].short_name);
        setCity(address[2].short_name);
        setState(address[3].short_name);
        setCountry(address[4].long_name);
        setLat(Number(geometry.lat));
        setLng(Number(geometry.lng));
        break;
      case 7:
        setPlace(address[1].short_name);
        setNumber(address[0].short_name);
        setComplement('Vazio');
        setNeighborhood(address[2].short_name);
        setCity(address[3].short_name);
        setState(address[4].short_name);
        setCountry(address[5].long_name);
        setLat(Number(geometry.lat));
        setLng(Number(geometry.lng));
        break;
      default:
        setPlace(address[2].short_name);
        setNumber(address[1].short_name);
        setComplement(address[0].short_name);
        setNeighborhood(address[3].short_name);
        setCity(address[4].short_name);
        setState(address[5].short_name);
        setCountry(address[6].long_name);
        setLat(Number(geometry.lat));
        setLng(Number(geometry.lng));
        break;
    }
  }

  async function register() {
    try {
      setLoading(true);
      await api.post('/deliveries', {
        name,
        weight,
        place,
        number,
        complement,
        neighborhood,
        city,
        state,
        country,
        lat,
        lng,
      });

      setLoading(false);
      toast.success('Cadastro Realizado com Sucesso');
    } catch (error) {
      toast.error(error.response.data.error);
      setLoading(false);
    }
  }

  async function reset() {
    try {
      await api.delete('/deliveries');

      toast.success('Clientes Deletados com Sucesso');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  useEffect(() => {
    async function loadRegisters() {
      const response = await api.get('/deliveries');

      const { data } = response;

      setMyRegisters(data);
    }

    loadRegisters();
  });

  return (
    <Container>
      <img src={logo} alt="Logo" />

      <Content>
        <LeftContent>
          <form>
            <input
              type="text"
              placeholder="Nome do Cliente"
              defaultValue={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Peso do Produto"
              defaultValue={weight}
              onChange={e => setWeight(e.target.value)}
            />
            <div className="location">
              <input
                type="text"
                placeholder="Endereço do Cliente"
                defaultValue={location}
                onChange={e => setLocation(e.target.value)}
              />
              <button
                type="button"
                className="button"
                onClick={() => geocode()}
              >
                BUSCAR
              </button>
            </div>
            <div className="coordinates">
              <input type="text" placeholder="Latitude" value={lat} disabled />
              <input type="text" placeholder="Longitude" value={lng} disabled />
            </div>
            {loading ? (
              <button type="button" disabled>
                Carregando...
              </button>
            ) : (
              <button type="button" onClick={() => register()}>
                Cadastrar Cliente
              </button>
            )}
          </form>
          <button type="button" onClick={() => reset()}>
            Resetar Cadastro{' '}
          </button>
        </LeftContent>

        <RightContent>
          <Map
            center={
              !mapLat && !mapLng ? [-23.59672, -46.64853] : [mapLat, mapLng]
            }
            zoom={12}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {myRegisters.map(registers => (
              <Marker
                key={registers._id}
                position={[
                  registers.address.geolocation.lat,
                  registers.address.geolocation.lng,
                ]}
                onclick={() => {
                  setActiveClient(registers);
                }}
              />
            ))}

            {activeClient && (
              <Popup
                position={[
                  activeClient.address.geolocation.lat,
                  activeClient.address.geolocation.lng,
                ]}
                onClose={() => {
                  setActiveClient(null);
                }}
              >
                <div>
                  <strong>{activeClient.name}</strong>
                  <p>{`${activeClient.weight} KG`}</p>
                </div>
              </Popup>
            )}
          </Map>

          <Resume>
            <Box>
              <strong>Total de Clientes</strong>
              <p>{myRegisters.length}</p>
            </Box>
            <Box>
              <strong>Peso Total</strong>
              <p>{myRegisters.reduce((acc, item) => acc + item.weight, 0)}</p>
            </Box>
            <Box>
              <strong>Ticket Médio*</strong>
              <p>
                {myRegisters.length
                  ? myRegisters.reduce((acc, item) => acc + item.weight, 0) /
                    myRegisters.length
                  : '0'}
              </p>
            </Box>
          </Resume>

          <Table>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Rua</th>
                  <th>Cidade</th>
                  <th>País</th>
                  <th>Peso</th>
                  <th>Lat</th>
                  <th>Lng</th>
                </tr>
              </thead>
              <tbody>
                {myRegisters.length ? (
                  myRegisters.map(registers => (
                    <tr key={registers._id}>
                      <td>{registers.name}</td>
                      <td>{registers.address.place}</td>
                      <td>{registers.address.city}</td>
                      <td>{registers.address.country}</td>
                      <td>{registers.weight}</td>
                      <td>{registers.address.geolocation.lat}</td>
                      <td>{registers.address.geolocation.lng}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">Não existe Clientes Cadastrados</td>
                  </tr>
                )}
              </tbody>
            </table>

            <p>*Peso Total/Total de Clientes</p>
          </Table>
        </RightContent>
      </Content>
    </Container>
  );
}
