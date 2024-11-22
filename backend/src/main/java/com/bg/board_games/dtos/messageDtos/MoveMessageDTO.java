package com.bg.board_games.dtos.messageDtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MoveMessageDTO {
    @JsonProperty("type")
    @NonNull
    private String type;
    
    @JsonProperty("payload")
    @NonNull
    private MoveDTO payload;
}
