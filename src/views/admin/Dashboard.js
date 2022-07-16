import React, { useState, useEffect } from "react";
import mqtt from 'mqtt'
import LineChart from "components/Cards/LineChart"
import Table from "components/Cards/Table";

const dataMqtt = {
  host: 'broker.emqx.io',
  clientId: 'esp32-PZEMclient-skripsi',
  port: 8083, // untuk port emqx: 8083, mosquitto: 8081/8080, hivemq: 8000
  username: 'skripsiPZEM',
  password: 'nurus123'
}

export default function Dashboard() {

  // data client mqtt
  const [client, setClient] = useState(null);

  // indikator apakah sudah subscribe/publish
  const [isSubed, setIsSub] = useState(false);
  const [isPub, setIsPub] = useState(false);

  // response dari mqtt
  const [payload, setPayload] = useState({});
  const [connectStatus, setConnectStatus] = useState('Connect');

  const mqttConnect = () => {
    const { host, clientId, port, username, password } = dataMqtt;
    const url = `ws://${host}:${port}/mqtt`;
    const options = {
      keepalive: 30,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
      rejectUnauthorized: false
    };
    options.clientId = clientId;
    options.username = username;
    options.password = password;

    setConnectStatus('Connecting');
    setClient(mqtt.connect(url, options));
  };

  useEffect(() => {
    mqttConnect();
  }, []);

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setConnectStatus('Connected');
        mqttSub();
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
      });
    }
  }, [client]);

  useEffect(() => {
    console.log(payload.message && JSON.parse(payload.message));
  }, [payload])
  
  useEffect(() => {
    console.log(connectStatus);
  }, [connectStatus])

  const mqttSub = () => {
    if (client) {
      const { topic, qos } = { topic: 'esp32/PZEMskripsi', qos: 0 };
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      });
    }
  };

  return (
    <>
      <div className="pt-24">
        <h1 className='text-2xl font-bold'>Monitoring Energi Listrik</h1>
        <div className="pt-8">
          <div className="flex flex-wrap">
            {/* <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4"> */}
            <div className="w-full mb-12 xl:mb-0 px-4">
              {/* <CardLineChart /> */}
              {isSubed && <LineChart payload={payload} />}
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full mb-12 xl:mb-0 px-4">
              {/* <Table /> */}
              {isSubed && <Table payload={payload} />}
              {/* <CardDoughnutChart /> */}
            </div>
            <div className="w-full xl:w-4/12 px-4">
              {/* <CardDoughnutChart2 /> */}
            </div>
            <div className="w-full xl:w-4/12 px-4">
              {/* <CardPieChart /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
