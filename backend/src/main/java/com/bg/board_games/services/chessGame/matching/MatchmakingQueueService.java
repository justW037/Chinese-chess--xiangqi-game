package com.bg.board_games.services.chessGame.matching;

import java.util.List;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.stream.Collectors;


import org.springframework.stereotype.Service;


import com.bg.board_games.models.Player;
import com.bg.board_games.services.chessGame.elo.IEloService;
import com.bg.board_games.services.chessGame.match.IMatchService;
import com.bg.board_games.services.chessGame.sendMessage.ISendMessageService;
import com.bg.board_games.services.game.IGameService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class MatchmakingQueueService implements IMatchmakingQueueService {
    private Queue<Player> queue = new LinkedList<>(); 
    private final int playersPerMatch = 2;
    private final IGameService gameService;
    private final ISendMessageService sendMessageService;
    private final IEloService eloService;
    private final IMatchService matchService;


    @Override
    public void addPlayer(Player player) throws Exception {
        queue.add(player);
        try {
            tryToCreateMatch();
        } catch (Exception e) {
            sendMessageService.sendErrorMessage(player, e.getMessage());
        }
    }

    @Override
    public Player findPlayerById(Long id) {
        for (Player player : queue) {
            if (player.getId() == id) {
                return player; 
            }
        }
        return null;
    }

    @Override
    public void removePlayerById(Long id) {
        for (Player player : queue) {
            if (player.getId() == id) {
                queue.remove(player); 
            }
        }

    }

    @Override
    public void tryToCreateMatch() throws Exception {
        List<Player> matchedPlayers = new ArrayList<>();
        // Match players with similar elo
        while (!queue.isEmpty() && matchedPlayers.size() < playersPerMatch) {
            Player currentPlayer = queue.poll();
            matchedPlayers.add(currentPlayer);
            for (Player player : queue) {
                if (eloService.isEloSimilar(currentPlayer, player)) {
                    matchedPlayers.add(player);
                    queue.remove(player); // Remove player from queue
                    if (matchedPlayers.size() == playersPerMatch) {
                        break;
                    }
                }
            }
        }

        if (matchedPlayers.size() == playersPerMatch) {
            startMatch(matchedPlayers);
        } else {
            // Add players back to the queue if they couldn't be matched
            for (Player player : matchedPlayers) {
                queue.offer(player);
            }
        }
    }

    @Override
    public void startMatch(List<Player> players) throws Exception {
        Player player1 = players.get(0);
        Player player2 = players.get(1);

        boolean randomRed = Math.random() < 0.5;
        player1.setRed(randomRed);
        player2.setRed(!randomRed);

        List<Long> userIds = players.stream()
            .map(Player::getId)
            .collect(Collectors.toList());
        Long gameId = gameService.addGame(userIds).getId();


        matchService.addMatch(gameId, players);

        sendMessageService.sendMatchStartMessage(player1, player2);
    }

    
}
