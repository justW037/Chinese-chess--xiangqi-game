package com.bg.board_games.services.chessGame.elo;

import com.bg.board_games.models.Player;

public interface IEloService {
    boolean isEloSimilar(Player player1, Player player2);
}
