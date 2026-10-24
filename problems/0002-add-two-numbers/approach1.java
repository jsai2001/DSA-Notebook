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
        ListNode head = new ListNode(); // @viz init
        ListNode output = head; // @viz init
        ListNode prev = null; // @viz init
        int carry = 0; // @viz init

        while (l1 != null && l2 != null) { // @viz while1
            int result = l1.val + l2.val + carry; // @viz digit1
            output.val = result % 10; // @viz digit1
            carry = result / 10; // @viz digit1
            prev = output; // @viz grow1
            output.next = new ListNode(); // @viz grow1
            output = output.next; // @viz grow1
            l1 = l1.next; // @viz grow1
            l2 = l2.next; // @viz grow1
        }

        while (l1 != null) { // @viz while2
            int result = l1.val + carry; // @viz digit2
            output.val = result % 10; // @viz digit2
            carry = result / 10; // @viz digit2
            prev = output; // @viz grow2
            output.next = new ListNode(); // @viz grow2
            output = output.next; // @viz grow2
            l1 = l1.next; // @viz grow2
        }

        while (l2 != null) { // @viz while3
            int result = l2.val + carry; // @viz digit3
            output.val = result % 10; // @viz digit3
            carry = result / 10; // @viz digit3
            prev = output; // @viz grow3
            output.next = new ListNode(); // @viz grow3
            output = output.next; // @viz grow3
            l2 = l2.next; // @viz grow3
        }

        if (carry == 1) { // @viz carry
            output.val = 1; // @viz carryval
            prev = output; // @viz carryval
            output.next = new ListNode(); // @viz carryval
        }

        prev.next = null; // cut off the extra trailing node // @viz trim
        return head; // @viz return
    }
}
