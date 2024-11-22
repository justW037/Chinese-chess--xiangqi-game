package com.bg.board_games.responses.game;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlayersInMatchResponse {
    @JsonProperty("game_id")
    private Long gameId;

    @JsonProperty("player_1")
    private PlayerInMatchResponse player1;

    @JsonProperty("player_2")
    private PlayerInMatchResponse player2;
}
