package it.profice.corso.LogIn_Registration_service.service;

import it.profice.corso.LogIn_Registration_service.dto.UserDTO;
import it.profice.corso.LogIn_Registration_service.dto.UserDtoUpdate;
import it.profice.corso.LogIn_Registration_service.model.User;

import java.util.List;

public interface UserService {

    UserDTO save(UserDTO userDTO);
    UserDTO update(String uuid, UserDtoUpdate userDtoToUpdate);
    List<UserDTO> findAll();
    UserDTO findByUuid(String uuid);
    void deleteByUuid(String uuid);
    UserDTO findByUsername(String username);
}
