import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useStore from '../core/store/store';
import { Player } from '../models/Player.model';

const Main: React.FC = () => {

  const { setCurrentPlayer } = useStore();

  useEffect(() => {
    const player: Player = {
      username: 'Nicola',
      randomChance: 50
    };
    setCurrentPlayer(player);
  }, []);

  return (
    <div className="m-3">
      <NavLink to="/game/abcd1234" className="bg-yellow-600 text-white rounded p-3 m-3">
        Prova Pagina
      </NavLink>
    </div>
  );
};

export default Main;
