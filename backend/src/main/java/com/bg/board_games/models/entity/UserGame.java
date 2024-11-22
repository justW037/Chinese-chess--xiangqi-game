package com.bg.board_games.models.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_games")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @Column(name = "points_earned")
    private int pointsEarned;
}
