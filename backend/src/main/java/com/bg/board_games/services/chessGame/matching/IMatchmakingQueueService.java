package com.bg.board_games.services.chessGame.matching;

import java.util.List;

import com.bg.board_games.models.Player;

public interface IMatchmakingQueueService {
    void addPlayer(Player player) throws Exception;
    void tryToCreateMatch() throws Exception;
    void startMatch(List<Player> players) throws Exception;
    Player findPlayerById(Long id);
    void removePlayerById(Long id);

}
