package com.bg.board_games.models;

import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Match {
    private List<Player> players;

    public void removePlayer(Long playerId) {
        players.removeIf(player -> player.getId().equals(playerId));
    }

    public boolean isLastPlayer(Long playerId) {
        return players.size() == 1 && players.get(0).getId().equals(playerId);
    }
}
