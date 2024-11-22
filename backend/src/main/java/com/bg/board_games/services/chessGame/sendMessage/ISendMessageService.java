package com.bg.board_games.services.chessGame.sendMessage;

import java.util.List;

import com.bg.board_games.dtos.messageDtos.MoveMessageDTO;
import com.bg.board_games.models.Match;
import com.bg.board_games.models.Player;

public interface ISendMessageService {
    void sendMatchStartMessage(Player player1, Player player2) throws Exception;
    void sendErrorMessage(Player player, String message) throws Exception;
    void sendMoveMessage(Match match, String sessionId, MoveMessageDTO moveMessage ) throws Exception;
    void sendGameOverMessage() throws Exception;
}
