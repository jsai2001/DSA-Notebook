import java.math.BigInteger;

/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        String sum = toNumber(l1).add(toNumber(l2)).toString();
        ListNode dummy = new ListNode(), tail = dummy;
        for (int k = sum.length() - 1; k >= 0; k--) {
            tail.next = new ListNode(sum.charAt(k) - '0');
            tail = tail.next;
        }
        return dummy.next;
    }

    // Digits are stored ones-first, so reverse them before parsing.
    private BigInteger toNumber(ListNode node) {
        StringBuilder digits = new StringBuilder();
        for (; node != null; node = node.next) digits.append(node.val);
        return new BigInteger(digits.reverse().toString());
    }
}
