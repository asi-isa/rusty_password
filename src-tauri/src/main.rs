#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use serde::Deserialize;

use passwords::{analyzer, scorer, PasswordGenerator};

#[derive(Deserialize)]
struct PasswordOption {
    length: usize,
    uppercase: bool,
    lowercase: bool,
    numbers: bool,
    symbols: bool,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn generate_password(option: PasswordOption) -> String {
    let pg = PasswordGenerator {
        length: option.length,
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

#[tauri::command]
fn score_password(password: &str) -> f64 {
    scorer::score(&analyzer::analyze(password))
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![generate_password, score_password])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
