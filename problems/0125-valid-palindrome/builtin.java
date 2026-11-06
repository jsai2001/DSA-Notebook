class Solution {
    public boolean isPalindrome(String s) {
        String cleaned = s.replaceAll("[^A-Za-z0-9]", "").toLowerCase();
        return new StringBuilder(cleaned).reverse().toString().equals(cleaned);
    }
}
