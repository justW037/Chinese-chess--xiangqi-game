package com.bg.board_games.responses.user;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

import com.bg.board_games.models.entity.User;
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
public class UserDetailResponse {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("username")
    private String username;

    @Email
    @NotBlank(message = "Email cannot be blank")
    @JsonProperty("email")
    private String email;

    @NotBlank(message = "Role cannot be blank")
    @JsonProperty("role")
    private String role;

    @JsonProperty("dob")
    private LocalDate dateOfBirth;

    @JsonProperty("country")
    private String country;

}

