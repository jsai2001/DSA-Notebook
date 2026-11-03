import java.math.BigInteger;
class Solution {
    public int[] plusOne(int[] digits) {
        StringBuilder sb = new StringBuilder();
        for (int d : digits) sb.append(d);
        // up to 100 digits: far too big for long, so use BigInteger
        String sum = new BigInteger(sb.toString()).add(BigInteger.ONE).toString();
        int[] result = new int[sum.length()];
        for (int i = 0; i < result.length; i++) result[i] = sum.charAt(i) - '0';
        return result;
    }
}
