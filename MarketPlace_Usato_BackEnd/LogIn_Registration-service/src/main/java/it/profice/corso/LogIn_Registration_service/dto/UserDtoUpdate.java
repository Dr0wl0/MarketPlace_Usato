package it.profice.corso.LogIn_Registration_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDtoUpdate {

    private String uuid;

    private String username;
    private String password;
}
