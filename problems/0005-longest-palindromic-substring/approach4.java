class Solution {
    public String longestPalindrome(String s) {
        StringBuilder sb = new StringBuilder("^#"); // "#" between chars; ^ and $ stop expansion // @viz build
        for (char c : s.toCharArray()) sb.append(c).append('#'); // @viz build
        char[] t = sb.append('$').toString().toCharArray(); // @viz build
        int[] p = new int[t.length]; // p[i]: radius centered at t[i] // @viz build
        int center = 0, right = 0; // @viz build
        for (int i = 1; i < t.length - 1; i++) { // @viz loop
            if (i < right) { // @viz mirror
                p[i] = Math.min(right - i, p[2 * center - i]); // reuse the mirror // @viz mirror
            }
            while (t[i + p[i] + 1] == t[i - p[i] - 1]) p[i]++; // @viz expand
            if (i + p[i] > right) { // @viz update
                center = i; // @viz update
                right = i + p[i]; // @viz update
            }
        }
        int mid = 0; // @viz answer
        for (int i = 1; i < p.length; i++) if (p[i] > p[mid]) mid = i; // @viz answer
        int start = (mid - p[mid]) / 2; // @viz answer
        return s.substring(start, start + p[mid]); // @viz answer
    }
}
