package com.bg.board_games.services.chessGame.match;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bg.board_games.models.Match;
import com.bg.board_games.models.Player;

import jakarta.validation.OverridesAttribute;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class MatchService implements IMatchService {
    private Map<Long, Match> gameMatches = new HashMap<>();

    @Override
    public void addMatch(Long gameId, List<Player> players) {
        gameMatches.put(gameId, new Match(players));
    }

    @Override
    public Match getMatchedPlayers(Long gameId) {
        Match gameMatch = gameMatches.get(gameId);
        return gameMatch;
    }

    @Override
    public void removePlayerFromMatch(Long gameId, Long playerId) {
        Match gameMatch = gameMatches.get(gameId);
        if (gameMatch != null) {
            gameMatch.removePlayer(playerId);
            if (gameMatch.getPlayers().isEmpty()) {
                gameMatches.remove(gameId);
            }
        }
    }

    @Override
    public boolean isLastPlayer(Long gameId, Long playerId) {
        Match gameMatch = gameMatches.get(gameId);
        return gameMatch != null && gameMatch.isLastPlayer(playerId);
    }
    
}
