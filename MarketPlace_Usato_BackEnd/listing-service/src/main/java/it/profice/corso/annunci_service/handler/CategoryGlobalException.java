package it.profice.corso.annunci_service.handler;

import it.profice.corso.annunci_service.exception.CategoryNotFound;
import it.profice.corso.annunci_service.exception.ListingNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class CategoryGlobalException {

    @ExceptionHandler(CategoryNotFound.class)
    public ResponseEntity<Map<String, Object>> handlerBookNotFoundException(CategoryNotFound e ){
        return new ResponseEntity<>(getRet("404", "La categoria non esiste!" ), HttpStatus.NOT_FOUND);
    }

    private Map<String, Object> getRet(String errorCode, String errorMessage) {
        Map<String, Object> ret = new HashMap<>();

        ret.put("timestamp", LocalDateTime.now());
        ret.put("error", errorCode);
        ret.put("message", errorMessage);
        return ret;
    }

}
