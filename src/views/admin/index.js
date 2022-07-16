import React, { createContext, useEffect, useState } from 'react';
import Connection from './component/Connection';
// import Publisher from './Publisher';
// import Subscriber from './Subscriber';
import Receiver from './component/Receiver';
import Chart from './component/Chart'
import mqtt from 'mqtt';

export const QosOption = createContext([])
// const qosOption = [
//     {
//         label: '0',
//         value: 0,
//     }, {
//         label: '1',
//         value: 1,
//     }, {
//         label: '2',
//         value: 2,
//     },
// ];

const dataMqtt = {
    host: 'broker.emqx.io',
    clientId: '',
    port: 8083, // untuk port emqx: 8083, mosquitto: 8081/8080, hivemq: 8000
    username: '',
    password: ''
}

const App = () => {

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client]);

    const mqttDisconnect = () => {
        if (client) {
            mqttUnSub();
            client.end(() => {
                setConnectStatus('Connect');
            });
        }
    }

    const mqttPublish = () => {
        if (client) {
            const { topic, qos, payload } = { topic: 'pzem/test', qos: 0, payload: randomInteger(1, 1000).toString() };
            client.publish(topic, payload, { qos }, error => {
                if (error) {
                    console.log('Publish error: ', error);
                }
            });
        }
    };

    const mqttSub = () => {
        if (client) {
            const { topic, qos } = { topic: 'pzem/test', qos: 0 };
            client.subscribe(topic, { qos }, (error) => {
                if (error) {
                    console.log('Subscribe to topics error', error)
                    return
                }
                setIsSub(true)
            });
        }
    };

    const mqttUnSub = () => {
        if (client) {
            const { topic } = { topic: 'pzem/test' };
            client.unsubscribe(topic, error => {
                if (error) {
                    console.log('Unsubscribe error', error)
                    return
                }
                setIsSub(false);
            });
        }
    };

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // // 60000 = 1minute
    // const TIME = 5000;

    // // digunakan menjalankan fungsi setiap variabel diatas 
    // setInterval(() => {
    //     if (isSubed) {
    //         mqttPublish();
    //     }
    // }, TIME);

    return (
        <>
            {isSubed && <Chart payload={payload} />}
            <Connection handleConnect={mqttConnect} handleDisconnect={mqttDisconnect} statusConnection={connectStatus} />
            {/* <button onClick={() => mqttPublish()} disabled={!isSubed}>Publish</button> */}
            <button onClick={() => setIsPub(!isPub)} disabled={!isSubed}>Publish</button>
            {isSubed && <Receiver payload={payload} />}
            {isPub && mqttPublish()}
        </>
    );
}

export default App;