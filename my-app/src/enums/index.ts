enum Status {
    CORRECT_POSITION = "success",
    WRONG_POSITION = "warning",
    WRONG_CHAR = "danger"
}

enum Theme {
    SUCCESS = "SUCCESS",
    WARNING = "WARNING",
    DANGER = "DANGER",
    BASE = "BASE",
}
  
enum BackgroundColor {
    SUCCESS = "rgb(2, 192, 118)",
    WARNING = "rgb(240, 185, 11)",
    DANGER = "rgb(71, 77, 87)",
    BASE = "rgb(11, 14, 17)"
}
  
enum BorderColor {
    SUCCESS = "rgb(2, 192, 118)",
    WARNING = "rgb(240, 185, 11)",
    DANGER = "rgb(71, 77, 87)",
    BASE = "rgb(240, 185, 11)"
}
  
enum Color {
    SUCCESS = "white",
    WARNING = "white",
    DANGER = "white",
    BASE = "rgb(240, 185, 11)"
}

export {
    Color,
    BorderColor,
    BackgroundColor,
    Theme,
    Status
}