class Solution {
    public boolean isPalindrome(String s) {
        StringBuilder cleaned = new StringBuilder(s.length()); // @viz init
        for (char c : s.toCharArray()) { // @viz loop
            if (Character.isLetterOrDigit(c)) { // letters and digits only // @viz check
                cleaned.append(Character.toLowerCase(c)); // @viz keep
            }
        }
        String forward = cleaned.toString(); // @viz join
        return forward.equals(cleaned.reverse().toString()); // reads the same backwards? // @viz compare
    }
}
