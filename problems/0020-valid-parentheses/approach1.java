class Solution {
    public boolean isValid(String s) {
        while (true) { // @viz loop
            // remove every adjacent matching pair: "()", then "[]", then "{}"
            String shorter = s.replace("()", "").replace("[]", "").replace("{}", ""); // @viz remove
            if (shorter.length() == s.length()) break; // nothing left to remove // @viz check
            s = shorter; // @viz shrink
        }
        return s.isEmpty(); // valid only if everything cancelled out // @viz return
    }
}
