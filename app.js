async function sendTrackType(trackType) {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ name: 'ESP32-CarSensor' }],
      optionalServices: ['0000181a-0000-1000-8000-00805f9b34fb']
    });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('0000181a-0000-1000-8000-00805f9b34fb');
    const characteristic = await service.getCharacteristic('00002a57-0000-1000-8000-00805f9b34fb');


    const encoder = new TextEncoder();
    await characteristic.writeValue(encoder.encode(trackType));

    console.log("Tipo de pista enviado:", trackType);
  } catch (error) {
    console.error("Erro ao enviar BLE:", error);
  }
}
