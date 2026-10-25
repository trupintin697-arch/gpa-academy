export function avatarUrl(seed, style = "avataaars") {
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed || "gpa")}`;
}
