#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use serde::Deserialize;

use passwords::PasswordGenerator;

#[derive(Deserialize)]
struct PasswordOption {
    length: u8,
    uppercase: bool,
    lowercase: bool,
    numbers: bool,
    symbols: bool,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn generate_password(option: PasswordOption) -> String {
    let pg = PasswordGenerator {
        length: option.length as usize,
        numbers: option.numbers,
        lowercase_letters: option.lowercase,
        uppercase_letters: option.uppercase,
        symbols: option.symbols,
        spaces: false,
        exclude_similar_characters: false,
        strict: true,
    };

    pg.generate_one().unwrap()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![generate_password])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
