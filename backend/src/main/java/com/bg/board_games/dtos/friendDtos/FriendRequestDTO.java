package com.bg.board_games.dtos.friendDtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FriendRequestDTO {

    @JsonProperty("user_id")
    @NotNull
    private Long userId ;
    
    @JsonProperty("target_id")
    @NotNull
    private Long targetUserId;
}
