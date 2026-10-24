/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* head = new ListNode(); // @viz init
        ListNode* output = head; // @viz init
        ListNode* prev = nullptr; // @viz init
        int carry = 0; // @viz init

        while (l1 != nullptr && l2 != nullptr) { // @viz while1
            int result = l1->val + l2->val + carry; // @viz digit1
            output->val = result % 10; // @viz digit1
            carry = result / 10; // @viz digit1
            prev = output; // @viz grow1
            output->next = new ListNode(); // @viz grow1
            output = output->next; // @viz grow1
            l1 = l1->next; // @viz grow1
            l2 = l2->next; // @viz grow1
        }

        while (l1 != nullptr) { // @viz while2
            int result = l1->val + carry; // @viz digit2
            output->val = result % 10; // @viz digit2
            carry = result / 10; // @viz digit2
            prev = output; // @viz grow2
            output->next = new ListNode(); // @viz grow2
            output = output->next; // @viz grow2
            l1 = l1->next; // @viz grow2
        }

        while (l2 != nullptr) { // @viz while3
            int result = l2->val + carry; // @viz digit3
            output->val = result % 10; // @viz digit3
            carry = result / 10; // @viz digit3
            prev = output; // @viz grow3
            output->next = new ListNode(); // @viz grow3
            output = output->next; // @viz grow3
            l2 = l2->next; // @viz grow3
        }

        if (carry == 1) { // @viz carry
            output->val = 1; // @viz carryval
            prev = output; // @viz carryval
            output->next = new ListNode(); // @viz carryval
        }

        delete prev->next;     // free the extra trailing node // @viz trim
        prev->next = nullptr; // @viz trim
        return head; // @viz return
    }
};
