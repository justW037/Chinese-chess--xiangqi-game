package com.bg.board_games.models;

import org.springframework.web.socket.WebSocketSession;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Player {
    private Long id;
    private String name;
    private int elo;
    private WebSocketSession session;
    private boolean isRed;

    public Player(Long id, String name, int elo, WebSocketSession session) {
        this.id = id;
        this.name = name;
        this.elo = elo;
        this.session = session;
    }
}
