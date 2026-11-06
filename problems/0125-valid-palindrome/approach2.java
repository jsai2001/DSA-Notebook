class Solution {
    public boolean isPalindrome(String s) {
        StringBuilder cleaned = new StringBuilder(); // @viz clean
        for (char c : s.toCharArray()) // @viz clean
            if (Character.isLetterOrDigit(c)) cleaned.append(Character.toLowerCase(c)); // @viz clean
        int i = 0, j = cleaned.length() - 1; // @viz init
        while (i < j) { // @viz loop
            if (cleaned.charAt(i) != cleaned.charAt(j)) { // @viz compare
                return false; // @viz false
            }
            i++; // @viz move
            j--; // @viz move
        }
        return true; // @viz true
    }
}
