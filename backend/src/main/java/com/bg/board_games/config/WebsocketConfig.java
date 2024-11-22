package com.bg.board_games.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.bg.board_games.repositories.PointRepository;
import com.bg.board_games.services.chessGame.matching.MatchmakingQueueService;
import com.bg.board_games.services.game.IGameService;
import com.bg.board_games.services.point.IPointService;
import com.bg.board_games.services.user.IUserService;
import com.bg.board_games.websocket.WebsocketHandler;

import lombok.RequiredArgsConstructor;



@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebsocketConfig implements WebSocketConfigurer {

    private final WebsocketHandler websocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(websocketHandler, "/api/v1/ws")
                .setAllowedOrigins("*"); 
    }
}