package com.bg.board_games.models.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "points")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Point extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "u_id", nullable = false)
    private User user;

    @Column(name = "point", nullable = false)
    private int point;

    @Column(name = "type", length = 20)
    private String type;


}
