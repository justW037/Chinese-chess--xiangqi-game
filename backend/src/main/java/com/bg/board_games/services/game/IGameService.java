package com.bg.board_games.services.game;

import java.util.List;

import com.bg.board_games.models.entity.Game;

public interface IGameService {
    Game addGame(List<Long> userIds) throws Exception;
    Game updateGame(Long gameId, String status, Long winnerId) throws Exception;
    Game getGame(String token) throws Exception;
}
