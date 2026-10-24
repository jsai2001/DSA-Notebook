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
        ListNode head = new ListNode();
        ListNode output = head;
        ListNode prev = null;
        int carry = 0;

        while (l1 != null && l2 != null) {
            int result = l1.val + l2.val + carry;
            output.val = result % 10;
            carry = result / 10;
            prev = output;
            output.next = new ListNode();
            output = output.next;
            l1 = l1.next;
            l2 = l2.next;
        }

        while (l1 != null) {
            int result = l1.val + carry;
            output.val = result % 10;
            carry = result / 10;
            prev = output;
            output.next = new ListNode();
            output = output.next;
            l1 = l1.next;
        }

        while (l2 != null) {
            int result = l2.val + carry;
            output.val = result % 10;
            carry = result / 10;
            prev = output;
            output.next = new ListNode();
            output = output.next;
            l2 = l2.next;
        }

        if (carry == 1) {
            output.val = 1;
            prev = output;
            output.next = new ListNode();
        }

        prev.next = null; // cut off the extra trailing node
        return head;
    }
}
