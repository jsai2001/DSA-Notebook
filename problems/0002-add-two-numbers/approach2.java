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
        ListNode dummy = new ListNode(); // @viz init
        ListNode tail = dummy; // @viz init
        int carry = 0; // @viz init

        while (l1 != null || l2 != null || carry != 0) { // @viz loop
            int total = carry; // @viz add
            if (l1 != null) { // @viz add
                total += l1.val; // @viz add
                l1 = l1.next; // @viz add
            }
            if (l2 != null) { // @viz add
                total += l2.val; // @viz add
                l2 = l2.next; // @viz add
            }

            tail.next = new ListNode(total % 10); // @viz append
            tail = tail.next; // @viz append
            carry = total / 10; // @viz append
        }

        return dummy.next; // @viz return
    }
}
