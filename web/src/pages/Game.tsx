import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Game: React.FC = () => {

  const { gameId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!gameId) {
      navigate('/not-found');
    }
  }, []);

  return (
    <span>
      game number { gameId || 'Not found' }
    </span>
  );
};

export default Game;
 