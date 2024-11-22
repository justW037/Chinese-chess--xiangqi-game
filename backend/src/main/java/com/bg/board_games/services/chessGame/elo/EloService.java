package com.bg.board_games.services.chessGame.elo;

import org.springframework.stereotype.Service;

import com.bg.board_games.models.Player;

@Service
public class EloService implements IEloService {
    @Override
    public boolean isEloSimilar(Player player1, Player player2) {
        return Math.abs(player1.getElo() - player2.getElo()) <= 50; 
    }
    
}
