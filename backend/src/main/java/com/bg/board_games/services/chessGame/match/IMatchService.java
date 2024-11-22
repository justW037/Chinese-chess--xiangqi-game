package com.bg.board_games.services.chessGame.match;

import java.util.List;

import com.bg.board_games.models.Match;
import com.bg.board_games.models.Player;


public interface IMatchService {
    void addMatch(Long gameId, List<Player> players) throws Exception;
    Match getMatchedPlayers(Long gameId);
    void removePlayerFromMatch(Long gameId, Long playerId);
    boolean isLastPlayer(Long gameId, Long playerId);
}
