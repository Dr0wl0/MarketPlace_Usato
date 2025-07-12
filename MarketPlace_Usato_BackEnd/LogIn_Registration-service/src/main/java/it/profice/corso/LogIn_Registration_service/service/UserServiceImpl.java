package it.profice.corso.LogIn_Registration_service.service;

import it.profice.corso.LogIn_Registration_service.dto.UserDTO;
import it.profice.corso.LogIn_Registration_service.exception.UserNotFoundException;
import it.profice.corso.LogIn_Registration_service.model.User;
import it.profice.corso.LogIn_Registration_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserDTO save(UserDTO userDTO) {
        return modelToDto( userRepository.save( dtoToModel (userDTO) ) );
    }

    @Override
    public UserDTO update(String uuid,UserDTO userDTO) {
        User userToUpdate = userRepository.findByUuid( uuid ).orElseThrow(UserNotFoundException::new);
        userToUpdate.setPassword(userDTO.getPassword());
        userToUpdate.setUsername(userDTO.getUsername());
        userToUpdate.setNomeCognome(userDTO.getNomeCognome());
        return modelToDto(userRepository.save(userToUpdate));
    }

    @Override
    public List<UserDTO> findAll() {
        return userRepository.findAll()
                .stream()
                .map(this::modelToDto)
                .toList();
    }

    @Override
    public UserDTO findByUuid(String uuid) {
        return modelToDto(userRepository.findByUuid(uuid).orElseThrow(UserNotFoundException::new));
    }

    @Override
    public void deleteByUuid(String uuid) {
        User userToDelete = userRepository.findByUuid(uuid).orElseThrow(UserNotFoundException::new);
        userRepository.deleteById(userToDelete.getId());
    }

    public UserDTO modelToDto(User user){
        return UserDTO.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .nomeCognome(user.getNomeCognome())
                .build();
    }

    public User dtoToModel (UserDTO userDto){
        return User.builder()
                .username(userDto.getUsername())
                .password(userDto.getPassword())
                .nomeCognome(userDto.getNomeCognome())
                .build();
    }

}
