package it.profice.corso.LogIn_Registration_service.repository;

import it.profice.corso.LogIn_Registration_service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUuid(String uuid);
}
