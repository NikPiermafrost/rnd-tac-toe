import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../core/store/store';

const Game: React.FC = () => {

  const { gameId } = useParams();
  const navigate = useNavigate();
  const { currentPlayer } = useStore();

  useEffect(() => {
    if (!gameId) {
      navigate('/not-found');
    }
  }, []);

  return (
    <>
      <p>
        game number {gameId || 'Not found'}
      </p>
      <p>
        player info: { currentPlayer?.username } { currentPlayer?.randomChance }
      </p>
    </>
  );
};

export default Game;
 