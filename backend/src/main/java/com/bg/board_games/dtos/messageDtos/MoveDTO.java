package com.bg.board_games.dtos.messageDtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import lombok.NonNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MoveDTO {
      @JsonProperty("player_id")
    @NonNull
    private Long playerId;

    @JsonProperty("start_x")
    @NotBlank(message = "Start X is mandatory")
    private int startX;

    @JsonProperty("start_y")
    @NotBlank(message = "Start Y is mandatory")
    private int startY;

    @JsonProperty("end_x")
    @NotBlank(message = "End X is mandatory")
    private int targetX;  

    @JsonProperty("end_y")  
    @NotBlank(message = "End Y is mandatory") 
    private int targetY;  
}
