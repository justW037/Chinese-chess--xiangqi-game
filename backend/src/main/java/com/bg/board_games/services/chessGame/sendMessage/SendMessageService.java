package com.bg.board_games.services.chessGame.sendMessage;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.bg.board_games.dtos.messageDtos.MoveMessageDTO;
import com.bg.board_games.enums.PieceSide;
import com.bg.board_games.models.Match;
import com.bg.board_games.models.Player;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SendMessageService implements ISendMessageService {


    @Override
    public void sendMatchStartMessage(Player player1, Player player2) throws Exception {
        player1.getSession().sendMessage(new TextMessage("Match started! You are : " + (player1.isRed() ? PieceSide.RED.name() : PieceSide.BLACK.name())));
        player2.getSession().sendMessage(new TextMessage("Match started! You are : " + (player2.isRed() ? PieceSide.RED.name() : PieceSide.BLACK.name())));
    }

    @Override
    public void sendErrorMessage(Player player, String message) throws Exception {
        player.getSession().sendMessage(new TextMessage("Error: " + message));
    }

    @Override
    public void sendMoveMessage(Match match, String sessionId, MoveMessageDTO moveMessage ) throws Exception {
        List<Player> players = match.getPlayers();

        for (Player player : players) {
            WebSocketSession playerSession = player.getSession();
          
            if (playerSession.isOpen() && !playerSession.getId().equals(sessionId)) {
                ObjectMapper objectMapper = new ObjectMapper();
                String message = objectMapper.writeValueAsString(moveMessage);
                playerSession.sendMessage(new TextMessage(message));
            }
        }
    }

    @Override
    public void sendGameOverMessage() throws Exception {
      
    }
}
