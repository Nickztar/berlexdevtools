#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use rumqttc::{AsyncClient, Event, Incoming, MqttOptions, QoS};
use serde::{Deserialize, Serialize};
use std::time::Duration;
use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![start_forwarding])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn start_forwarding(
    app_handle: tauri::AppHandle,
    config: MqttConfig,
) -> Result<bool, String> {
    tauri::async_runtime::spawn(forwarding(app_handle, config));
    return Ok(true);
    // let mqttoptions = MqttOptions::new("rust-ep", config.host, config.port)
    //     .set_keep_alive(Duration::from_secs(5))
    //     .set_credentials(config.username, config.password)
    //     .to_owned();

    // let (client, mut eventloop) = AsyncClient::new(mqttoptions, 10);
    // client
    //     .subscribe("$share/eventprocessor/R6/#", QoS::AtMostOnce)
    //     .await
    //     .unwrap();

    // loop {
    //     let notification = eventloop.poll().await.unwrap();
    //     match notification {
    //         Event::Incoming(incoming) => match incoming {
    //             Incoming::Publish(publish) => {
    //                 let topic = publish.topic;
    //                 let payload = String::from_utf8(publish.payload.to_vec()).unwrap();
    //                 let message = Message { topic, payload };
    //                 println!("{:?}", message);
    //                 app_handle.emit_all("mqtt-message", message).unwrap();
    //             }
    //             _ => {}
    //         },
    //         _ => {}
    //     }
    // }
}

async fn forwarding(app_handle: tauri::AppHandle, config: MqttConfig) {
    let mqttoptions = MqttOptions::new("rust-ep", config.host, config.port)
        .set_keep_alive(Duration::from_secs(5))
        .set_credentials(config.username, config.password)
        .to_owned();

    let (client, mut eventloop) = AsyncClient::new(mqttoptions, 10);
    client
        .subscribe("$share/eventprocessor/R6/#", QoS::AtMostOnce)
        .await
        .unwrap();

    loop {
        let notification = eventloop.poll().await.unwrap();
        match notification {
            Event::Incoming(incoming) => match incoming {
                Incoming::Publish(publish) => {
                    let topic = publish.topic;
                    let payload = String::from_utf8(publish.payload.to_vec()).unwrap();
                    let message = Message { topic, payload };
                    println!("{:?}", message);
                    app_handle.emit_all("mqtt-message", message).unwrap();
                }
                _ => {}
            },
            _ => {}
        }
    }
}

#[derive(Debug, Serialize, Clone)]
struct Message {
    topic: String,
    payload: String,
}

#[derive(Debug, Deserialize)]
struct MqttConfig {
    host: String,
    port: u16,
    username: String,
    password: String,
}
