package com.bg.board_games.models.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_tournaments")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserTournament {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "tournament_id", nullable = false)
    private Tournament tournament;

    @Column(name = "points_earned")
    private int pointsEarned;
}
