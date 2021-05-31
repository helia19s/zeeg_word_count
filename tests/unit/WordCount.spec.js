import Vue from 'vue';
import { mount } from '@vue/test-utils';
import WordCount from '../../src/components/WordCount.vue';
import replaceAllInserter from 'string.prototype.replaceall';

import BootstrapVue from "bootstrap-vue"

Vue.use(BootstrapVue)


replaceAllInserter.shim();


describe('WordCount test', () => {
  it('should count words on button click',async () => {
    const wrapper = mount(WordCount);
    const { vm } = wrapper;
    wrapper.setData({
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sit adipiscing.',
    });
    const button = wrapper.find('#counwords');
    await button.trigger('click');

    expect(JSON.stringify(vm.words)).toBe('{"lorem":1,"ipsum":1,"dolor":1,"sit":2,"amet":1,"consectetuer":1,"adipiscing":2,"elit":1}');
  });

  it('should remove words on button click in table', async  () => {
    const wrapper = mount(WordCount);
    const { vm } = wrapper;
    wrapper.setData({
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sit adipiscing.',
    });
    const button = wrapper.find('#counwords');
    await  button.trigger('click');
    
    const delete_button = wrapper.find("#w-lorem");
    await  delete_button.trigger('click');

    console.log(JSON.stringify(wrapper.vm.words));

    expect(JSON.stringify(wrapper.vm.words)).toBe('{"ipsum":1,"dolor":1,"sit":2,"amet":1,"consectetuer":1,"adipiscing":2,"elit":1}');
    expect(wrapper.vm.text).toBe('ipsum dolor sit amet, consectetuer adipiscing elit. Sit adipiscing.');
  });

});