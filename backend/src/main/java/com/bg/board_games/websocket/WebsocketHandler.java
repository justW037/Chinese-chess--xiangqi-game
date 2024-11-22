package com.bg.board_games.websocket;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.bg.board_games.dtos.messageDtos.MoveMessageDTO;
import com.bg.board_games.enums.GameStatus;
import com.bg.board_games.enums.MessageType;
import com.bg.board_games.enums.PointType;
import com.bg.board_games.models.Match;
import com.bg.board_games.models.Player;
import com.bg.board_games.models.entity.Game;
import com.bg.board_games.models.entity.Point;
import com.bg.board_games.models.entity.User;
import com.bg.board_games.repositories.PointRepository;
import com.bg.board_games.services.chessGame.match.IMatchService;
import com.bg.board_games.services.chessGame.matching.IMatchmakingQueueService;
import com.bg.board_games.services.chessGame.sendMessage.ISendMessageService;
import com.bg.board_games.services.game.IGameService;
import com.bg.board_games.services.point.IPointService;
import com.bg.board_games.services.user.IUserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class WebsocketHandler extends TextWebSocketHandler {
    private final IUserService userService;
    private final PointRepository pointRepository;
    private final IMatchmakingQueueService matchmakingQueue;
    private final IGameService gameService;
    private final ISendMessageService sendMessageService;
    private final IMatchService matchService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String token = getTokenFromSession(session);
        if(token == null) {
            session.close();
            return;
        }
        User user = userService.getUserDetailsFromToken(token);
        Point point = pointRepository.findByUserIdAndType(user.getId(), PointType.GAME.name());
        Player player = new Player(user.getId(), user.getUsername(), point.getPoint() ,session);

        Player playerExistedInQueue = matchmakingQueue.findPlayerById(user.getId());

        if ( playerExistedInQueue != null) {
            matchmakingQueue.removePlayerById(playerExistedInQueue.getId());
        }

        matchmakingQueue.addPlayer(player);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String token = getTokenFromSession(session);
        if(token == null) {
            session.close();
            return;
        }
        Long gameId = gameService.getGame(token).getId();
        Match match = matchService.getMatchedPlayers(gameId);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(message.getPayload());

        String type = jsonNode.get("type").asText();
        if (MessageType.MOVE.name().equals(type.toUpperCase())) {
            MoveMessageDTO moveMessage = objectMapper.treeToValue(jsonNode, MoveMessageDTO.class);
            sendMessageService.sendMoveMessage(match, session.getId(), moveMessage);
        
        } 
        if (MessageType.GAME_OVER.name().equals(type.toUpperCase())) {
            // sendMessageService.sendGameOverMessage(match, session.getId());
            JsonNode payloadNode = jsonNode.get("payload");
            Long winnerId = payloadNode.get("winner_id").asLong();

            gameService.updateGame(gameId, GameStatus.FINISHED.name(), winnerId);

        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String token = getTokenFromSession(session);
        if(token == null) {
            session.close();
            return;
        }
        Long gameId = gameService.getGame(token).getId();
        Long playerId = userService.getUserDetailsFromToken(token).getId();

        Player player = matchmakingQueue.findPlayerById(playerId);

        if (player != null) {
            matchmakingQueue.removePlayerById(playerId);
        }

        if (matchService.isLastPlayer(gameId, playerId)) {
            gameService.updateGame(gameId, GameStatus.FINISHED.name(), playerId);
        }
        matchService.removePlayerFromMatch(gameId, playerId);

    }

    private String getTokenFromSession(WebSocketSession session) {
        return session.getUri().getQuery().split("=")[1];
    }

}
