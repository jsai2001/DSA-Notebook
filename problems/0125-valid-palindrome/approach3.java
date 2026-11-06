class Solution {
    public boolean isPalindrome(String s) {
        int i = 0, j = s.length() - 1; // @viz init
        while (i < j) { // @viz loop
            while (i < j && !Character.isLetterOrDigit(s.charAt(i))) i++; // skip from the left // @viz skipleft
            while (i < j && !Character.isLetterOrDigit(s.charAt(j))) j--; // skip from the right // @viz skipright
            if (Character.toLowerCase(s.charAt(i)) != Character.toLowerCase(s.charAt(j))) { // @viz compare
                return false; // @viz false
            }
            i++; // @viz move
            j--; // @viz move
        }
        return true; // @viz true
    }
}
