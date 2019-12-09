package com.telespazio.domino.web.rest;

import com.telespazio.domino.service.JhipsterProtocoloKafkaProducer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/jhipster-protocolo-kafka")
public class JhipsterProtocoloKafkaResource {

    private final Logger log = LoggerFactory.getLogger(JhipsterProtocoloKafkaResource.class);

    private JhipsterProtocoloKafkaProducer kafkaProducer;

    public JhipsterProtocoloKafkaResource(JhipsterProtocoloKafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    @PostMapping("/publish")
    public void sendMessageToKafkaTopic(@RequestParam("message") String message) {
        log.debug("REST request to send to Kafka topic the message : {}", message);
        this.kafkaProducer.send(message);
    }
}
