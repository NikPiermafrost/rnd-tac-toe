import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

const initializeSignalrHub = (): void => {
  const gameConnection: HubConnection = new HubConnectionBuilder()
    .withUrl('game-hub')
    .withAutomaticReconnect()
    .build();

  gameConnection.on('send', data => {
    console.log(data);
  });

  gameConnection.start()
    .then(() => gameConnection.invoke('send', 'Hello'));
};

export default initializeSignalrHub;
